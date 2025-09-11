import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!:string;
}

User.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role:{type:DataTypes.STRING,allowNull:false}
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

export default User;