import { Injectable } from "@nestjs/common";
import { DbDataOpsInstance } from "../../libs/mongodb";
import { Filter } from "mongodb";

@Injectable()
export class RbacsRepository {
    private collectionName = "rbacs";

    create = async (data: any): Promise<any> => {
        try {
            const result = DbDataOpsInstance.insertOne<any>(
                this.collectionName,
                data
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readMany = (
        filter: Filter<any>,
        limit: number,
        page: number
    ): any => {
        try {
            return DbDataOpsInstance.find<any>(
                this.collectionName,
                filter,
                {
                    limit: limit,
                    skip: page * limit - limit
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readOne = async (id: string): Promise<any> => {
        try {
            return await DbDataOpsInstance.findOne<any>(
                this.collectionName,
                {
                    id: id
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    update = async (id: string, data: any): Promise<any> => {
        try {
            const result = DbDataOpsInstance.updateOne<any>(
                this.collectionName,
                {
                    _id: id
                },
                data
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    delete = async (id: string): Promise<any> => {
        try {
            const result = DbDataOpsInstance.deleteOne<any>(
                this.collectionName,
                {
                    _id: id
                },
                null
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }
}
