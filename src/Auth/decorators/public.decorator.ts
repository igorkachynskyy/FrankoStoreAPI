import { SetMetadata } from '@nestjs/common';
import { PUBLIC } from '../auth.constants';

export const Public = () => SetMetadata(PUBLIC, true);
