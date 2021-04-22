import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User"


class UsersService {
    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }
    async create(email: String) {
        //Verificar se o usuário já existe

        const userExists = await this.usersRepository.findOne({
            email
        })

        //Se existir, retornar o usuário
        if(userExists){
            return userExists;
        }

        //Se não existir, salvar no DB
        const user = this.usersRepository.create({
            email
        })

        await this.usersRepository.save(user);

        return user;

    }
}

export { UsersService };