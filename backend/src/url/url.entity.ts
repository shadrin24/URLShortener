import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import {VisitEntity} from "./visit.entity";

@Entity('urls')
export class UrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shortUrl: string;

    @Column()
    originalUrl: string;

    @Column({ nullable: true })
    alias?: string;

    @Column({ nullable: true, type: 'timestamp' })
    expiresAt?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 0 })
    clickCount: number;

    @OneToMany(() => VisitEntity, (visit) => visit.url)
    visits: VisitEntity[];
}
