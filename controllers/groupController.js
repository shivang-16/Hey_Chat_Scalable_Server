import { Group } from "../models/groupModel.js"



export const saveGroup = async(req, res) => {
    try {
        const {groupName, messages} = req.body
        console.log(groupName, messages)
        const messagesArray = messages || ["No messages"];

        const group = await Group.create({
            groupName,
            creator: req.user._id,
            messages: messagesArray
        })

        if(!group) res.status(400).json({messages: "Error creating groups"})

        const groups = await Group.find().populate("creator")
        res.status(201).json({
            success: true,
            groups
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

export const getGroupByCreator = async(req, res) => {
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