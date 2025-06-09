import { Controller } from '@nestjs/common';
import { ActivationCodesService } from './activation-codes.service';

@Controller('activation-codes')
export class ActivationCodesController {
  constructor(private activationCodesService: ActivationCodesService) {}
}
