import * as fs from 'fs-extra';
import * as path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {

    private dbPath = path.join(__dirname, '../../db.json');

    // get the data from the db.json file
    async loadData() {
        try {
            const data = await fs.readJson(this.dbPath);
            return data;
        } catch (error) {
            throw new Error('Failed to load data from JSON file');
        }
    }

    // get the data based on the id
    async getById(id: number) {
        const data = await this.loadData();
        console.log(data)
        const record = data.find(item => item.id === id);
        if (!record) {
            throw new NotFoundException(`Record with ID ${id} not found`);
        }
        return record;
    }

    async addRecordToArray(newUser: any) {
        const data = await this.loadData();

        if (!data.users) {
            data.users = [];
        }

        const maxId = data.length
        newUser.id = maxId + 1;

        data.push(newUser);

        await this.saveData(data);
    }
    async saveData(data: any): Promise<void> {
        try {
            await fs.writeJson(this.dbPath, data, { spaces: 2 });
        } catch (error) {
            throw new Error('Failed to save data to JSON file');
        }
    }

}
