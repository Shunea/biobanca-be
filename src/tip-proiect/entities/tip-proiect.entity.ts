import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TipProiect extends CommonEntity {
    @Column({ type: String })
    name: string;
}

