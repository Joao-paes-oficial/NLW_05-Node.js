import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Setting } from "../entities/Setting"

interface ISettingsCreate{
    chat: boolean,
    username: String
}

class SettingsService{
    private settingsRepository: Repository<Setting>;

    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate){

        // Select * from settings where username = "username" limit 1;
        const userAlreadyExist = await this.settingsRepository.findOne({username});

        if(userAlreadyExist){
            throw new Error('User already exists!');
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        })

        await this.settingsRepository.save(settings);
        return settings;
    }

    async findByUsername(username: string){
        const settings = await this.settingsRepository.findOne({
            username
        });

        return settings;
    }

    async update(username: string, chat: string){
        await this.settingsRepository.createQueryBuilder().
            update(Setting)
            .set({ chat })
            .where("username = :username", {
                username
            }).execute()
    }
}

export { SettingsService }