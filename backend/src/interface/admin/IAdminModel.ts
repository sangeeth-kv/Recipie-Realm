import { Types } from "mongoose";
export interface IAdminModel{
    userId:Types.ObjectId

    permissions:{
        manageUsers:boolean;
        manageRecipes:boolean;
        managePayments:boolean;
        manageAdmins:boolean;
        viewAnalytics:boolean;
    }

    Blocked:{
        isBlocked:boolean;
        blockedReason:string;
        blockedBy:Types.ObjectId;
    }
    Deleted: {
        isDeleted:boolean;
        deletedReason:string;
        deletedBy:Types.ObjectId;
    };

    lastLogin?: Date;
    lastLogout?: Date;

    loginHistory: {
        ip?: string;
        device?: string;
        date?: Date;
    }[];

    failedLoginAttempts: number;
    lockUntil?: Date;

    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}