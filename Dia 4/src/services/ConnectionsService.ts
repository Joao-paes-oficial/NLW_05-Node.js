import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate{
    socket_id: String;
    user_id: String;
    admin_id?: String;
    id?: String;
}

class ConnectionsService{
    private connectionsRepository: Repository<Connection>

    constructor(){
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }
    async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {
        const connection = await this.connectionsRepository.create({
            socket_id,
            user_id, 
            admin_id,
            id
        });

        await this.connectionsRepository.save(connection);

        return connection;
    }
    async findByUserId(user_id: String){
        const connection = await this.connectionsRepository.findOne({
            user_id
        });
        
        return connection;
    }
}

export { ConnectionsService }