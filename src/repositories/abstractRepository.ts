import {LessThanOrEqual, Like, MoreThanOrEqual, Repository} from "typeorm";
import {dataSource} from "../../ormconfig";

export class AbstractRepository extends Repository<any> {
    private tableName: string;

    constructor(dto: any, tableName: string = '') {
        super(dto, dataSource.createEntityManager());

        this.tableName = tableName;
    }

    async getById(id: number): Promise<any> {
        return await this.findOne({ where: { id: id } });
    }

    async getAll(): Promise<any> {
        return await this.find();
    }

    async getList(options: any, filter: any, relations: string[] = []): Promise<any> {
        const offset = (options.page - 1) * options.items_per_page;
        const limit = options.items_per_page;
        const where: any = {};
        const order: any = { id: "DESC" };

        if (filter.length > 0) {
            filter.forEach((item: any, key: any) => {
                if (item.operator == 'like') {
                    where[item.column] = Like(`%${item.value}%`);
                } else if (item.operator == 'gte') {
                    where[item.column] = MoreThanOrEqual(`${item.value}`);
                } else if (item.operator == 'lte') {
                    where[item.column] = LessThanOrEqual(`${item.value}`);
                } else {
                    where[item.column] = `${item.value}`;
                }
            })
        }

        if (Object.keys(options.order_by).length > 0) {
            order[options.order_by.column] = options.order_by.type;
        }

        const data = await this.find({
            where,
            order,
            skip: offset,
            take: limit,
            relations
        });
        const totalCount = await this.count({ where });

        return {
            list: data,
            count: totalCount
        }
    }
}
