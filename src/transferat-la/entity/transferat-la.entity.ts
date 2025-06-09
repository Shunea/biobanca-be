import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TransferatLa extends CommonEntity {
    @Column({ type: String })
    name: string;
}
