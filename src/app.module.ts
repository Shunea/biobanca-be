import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonatorModule } from './donator/donator.module';
import { UserModule } from './user/user.module';
import { ProbaModule } from './proba/proba.module';
import { ProjectsModule } from './projects/projects.module';
import { CIMXModule } from './cimx/cimx.module';
import { StatutModule } from './statut/statut.module';
import { TrimisDeModule } from './trimisde/trimisde.module';
import { UnitatiMasuraModule } from './unitati-masura/unitati-masura.module';
import { BiospecimenModule } from './biospecimen/biospecimen.module';
import { AuthModule } from './auth/auth.module';
import { ActivationCodes } from './activation_codes/entities/activation-codes.entity';
import { ImspModule } from './imsp/imsp.module';
import { BoliModule } from './boli/boli.module';
import { SectiaModule } from './sectia/sectia.module';
import { GrupaSangvinaModule } from './grupa-sangvina/grupa-sangvina.module';
import { CormModule } from './corm/corm.module';
import { LocalitateModule } from './localitate/localitate.module';
import { TransferatLaModule } from './transferat-la/transferat-la.module';
import { TipProbaModule } from './tip-proba/tip-proba.module';
import { AnamnezaAlergologicaModule } from './anamneza-alergologica/anamneza-alergologica.module';
import { RaionModule } from './raion/raion.module';
import { ProvenientaDonatorModule } from './provenienta-donator/provenienta-donator.module';
import { MaladiiInfectioaseModule } from './maladii-infectioase/maladii-infectioase.module';
import { TipPastrareModule } from './tip-pastrare/tip-pastrare.module';
import { AntecedenteEredocolateraleModule } from './antecedente-eredocolaterale/antecedente-eredocolaterale.module';
import { TipProiectModule } from './tip-proiect/tip-proiect.module';
import { ProbaAlicotataModule } from './proba-alicotata/proba-alicotata.module';
import { ParinteModule } from './parinte/parinte.module';
import { RudeModule } from './rude/rude.module';
import { CopiiModule } from './copii/copii.module';
import { FrigiderModule } from './frigider/frigider.module';
import { CutieModule } from './cutie/cutie.module';
import { CetatenieModule } from './cetatenie/cetatenie.module';
import { EtnieModule } from './etnie/etnie.module';
import { AnalizeModule } from './analize/analize.module';
import { VarstaStareSanatateModule } from './varsta-stare-sanatate/varsta-stare-sanatate.module';
import { CelulaCutieModule } from './celula-cutie/celula-cutie.module';
import { DeprinderiNociveModule } from './deprinderi-nocive/deprinderi-nocive.module';
import { StareGeneralaPrelevareModule } from './stare-generala-prelevare/stare-generala-prelevare.module';
import { VaccinModule } from './vaccin/vaccin.module';
import { AnamnezaVietiiModule } from './anamneza-vietii/anamneza-vietii.module';
import { TipVaccinModule } from './tip-vaccin/tip-vaccin.module';
import { BarcodeModule } from './barcode/barcode.module';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ActivationCodes,
    AnamnezaAlergologicaModule,
    AntecedenteEredocolateraleModule,
    AuthModule,
    BarcodeModule,
    BiospecimenModule,
    BoliModule,
    CelulaCutieModule,
    CIMXModule,
    CopiiModule,
    CormModule,
    CutieModule,
    DonatorModule,
    FrigiderModule,
    GrupaSangvinaModule,
    ImspModule,
    LocalitateModule,
    MaladiiInfectioaseModule,
    ParinteModule,
    ProbaModule,
    ProbaAlicotataModule,
    ProjectsModule,
    ProvenientaDonatorModule,
    RaionModule,
    RudeModule,
    SectiaModule,
    StatutModule,
    TransferatLaModule,
    TrimisDeModule,
    TipPastrareModule,
    TipProbaModule,
    UnitatiMasuraModule,
    UserModule,
    TipProbaModule,
    ProvenientaDonatorModule,
    MaladiiInfectioaseModule,
    TipPastrareModule,
    AntecedenteEredocolateraleModule,
    TipProiectModule,
    CetatenieModule,
    EtnieModule,
    AnalizeModule,
    VarstaStareSanatateModule,
    DeprinderiNociveModule,
    StareGeneralaPrelevareModule,
    VaccinModule,
    AnamnezaVietiiModule,
    TipVaccinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
