import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
}
