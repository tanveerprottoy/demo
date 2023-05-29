import { Injectable } from "@nestjs/common";
import { DbDataOpsInstance } from "../../libs/mongodb";
import { Filter, ObjectId } from "mongodb";

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

    readManyStream = (
        filter: Filter<any>,
        limit: number,
        page: number
    ) => {
        return new Promise((resolve, reject) => {
            try {
                const data = [];
                const response = DbDataOpsInstance.find<any>(
                    this.collectionName,
                    filter,
                    {
                        limit: limit,
                        skip: page * limit - limit
                    }
                );
                const stream = response.stream();
                stream.on("data", function (doc) {
                    // console.log(doc);
                    data.push(doc);
                });
                stream.on("error", function (err) {
                    console.log(err);
                    reject(err);
                });
                stream.on("end", function () {
                    // console.log("All done!");
                    resolve(data);
                });
            }
            catch(e) {
                console.error(e);
                reject(e);
            }
        });
    }

    readOne = async (id: string): Promise<any> => {
        try {
            return await DbDataOpsInstance.findOne<any>(
                this.collectionName,
                {
                    _id: new ObjectId(id)
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
