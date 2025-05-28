import { leadValidator, updateLeadValidator } from "../validators/lead.js";
import { leadModel } from "../model/lead.js";

export const createLead = async (req, res, next) => {
    try {
        const { error, value } = leadValidator.validate(req.body);

        if (error) {
            return res.status(422).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }

        const existingLead = await leadModel.findOne({
            $or: [
                { email: value.email },
                { phone: value.phone }
            ]
        });

        if (existingLead) {
            return res.status(409).json({
                message: 'Lead already exists'
            });
        }

        await leadModel.create({
            ...value,
            // owner: req.user.id
        });

        return res.status(201).json("Lead created");
    } catch (error) {
        next(error);
    }
};


export const getAllLeads = async (req, res, next) => {
    try {
        const { filter = '{}', sort = '{}', limit = 100, skip = 0 } = req.query;

        let parsedFilter = {};
        let parsedSort = {};
        try {
            parsedFilter = JSON.parse(filter);
            parsedSort = JSON.parse(sort);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid filter or sort format' });
        }

        const leads = await leadModel.find(parsedFilter)
            .sort(parsedSort)
            .limit(Number(limit))
            .skip(Number(skip));

        res.status(200).json(leads);
    } catch (error) {
        next(error);
    }
};


export const countLeads = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;

    let parsedFilter;
    try {
      parsedFilter = JSON.parse(filter);
    } catch (err) {
      return res.status(400).json({ message: "Invalid filter JSON" });
    }

    // Secure filter: only count leads owned by current user
    const filterWithOwnership = { 
        ...parsedFilter, 
        // owner: req.user.id 
    };

    const count = await leadModel.countDocuments(filterWithOwnership);

    res.json({ count });
  } catch (error) {
    next(error);
  }
};


export const getLeadById = async (req, res, next) => {
    try {
        const lead = await leadModel.findOne({
            _id: req.params.id,
            // owner: req.user.id
        });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.status(200).json(lead);
    } catch (error) {
        next(error);
    }
};


export const updateLeadById = async (req, res, next) => {
  try {
    const { error, value } = updateLeadValidator.validate(req.body);

    if (error) {
      return res.status(422).json({
        message: 'Validation error',
        details: error.details.map(d => d.message)
      });
    }

    // Add updatedBy to the value being saved
    const updatePayload = {
      ...value,
    //   updatedBy: req.user.id
    };

    const lead = await leadModel.findOneAndUpdate(
      { _id: req.params.id, 
        // owner: req.user.id 
    },
      updatePayload,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated", lead });
  } catch (error) {
    next(error);
  }
};


export const deleteLeadById = async (req, res, next) => {
    try {
        const lead = await leadModel.findOneAndDelete({
            _id: req.params.id,
            // owner: req.user.id
        });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found!" });
        }

        res.status(200).json({ message: "Lead deleted successfully", lead });
    } catch (error) {
        next(error);
    }
};


