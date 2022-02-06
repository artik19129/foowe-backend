import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import { Rights } from '../enums/rights.enum';
import { User } from '../interface/user.interface';

interface AccountAttributes {
    id: number;
    login: string;
    password: string;
    email: string;
    rights?: Rights;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AccountInput extends Optional<AccountAttributes, 'id' | 'login' | 'email'> {
}

export interface AccountOutput extends Required<AccountAttributes> {
}

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
    public id!: number;
    public login!: string;
    public password!: string;
    public email!: string;
    public rights?: Rights;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static async createAccount(data: User) {
        return this.create(data);
    }

    static async getAccounts() {
        return this.findAll();
    }

    static async getAccountsByLogin(login: string) {
        return this.findOne({
            where: {
                login,
            },
        });
    }
}

Account.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    rights: {
        type: DataTypes.ENUM(
            'guest',
            'user',
            'admin',
            'developer',
        ),
        defaultValue: 'guest',
    },
}, {
    tableName: 'accounts',
    timestamps: true,
    sequelize: sequelizeConnection,
});

// Account.sync()

export default Account;
