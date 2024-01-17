import { Group } from "../models/groupModel.js"



export const saveGroup = async(req, res) => {
    try {
        const {groupName} = req.body

        const group = await Group.create({
            groupName,
            creator: req.user._id,
            members: req.user
        })

        res.status(201).json({
            success: true,
            group
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const getAllGroups = async(req, res) => {
    try {
        const allGroups = await Group.find()
        res.status(200).json({
            success: true,
            allGroups
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const getMyGroups = async(req, res) => {
    try {
        const group = await Group.find({creator: req.user._id})
        if(!group) return res.status(404).json({success: false, message: "No group found"})

        res.status(200).json({
            success: true,
            group
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const joinGroup = async (req, res) => {
    try {
      const { groupId } = req.body;
      console.log(groupId)
      // Find the group by groupId and update the members array
      const updatedGroup = await Group.findByIdAndUpdate(
        groupId,
        {
          $push: { members: req.user._id },
        },
        { new: true } 
      );
  
      if (!updatedGroup) {
        return res.status(404).json({
          success: false,
          message: "Group not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: `You were added in ${updatedGroup.groupName}`
        // updatedGroup,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };