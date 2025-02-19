import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UrlEntity } from './url.entity';

@Entity('visits')
export class VisitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UrlEntity, (url) => url.visits, { onDelete: 'CASCADE' })
    url: UrlEntity;

    @Column()
    ipAddress: string;

    @CreateDateColumn()
    visitedAt: Date;
}
