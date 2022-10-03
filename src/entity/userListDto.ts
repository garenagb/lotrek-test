import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity({name: "user_list"})
export class UserListDto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    username: string;

    @Column({type: "varchar", length: 64})
    password: string;

    @CreateDateColumn()
    created_at: string;

    @CreateDateColumn()
    updated_at: string;
}
