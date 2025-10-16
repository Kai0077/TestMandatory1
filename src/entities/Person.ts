import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type TGender = "male" | "female";

@Entity("person")
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({
    type: "enum",
    enum: ["male", "female"],
  })
  gender!: TGender;

  @Column({ unique: true })
  cpr!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column({ type: "date" })
  birthdate!: Date;
}