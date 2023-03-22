import { IsObjectId } from '../../decorators/object.id.decorator';

export class CommonChecksDTO {
  @IsObjectId('id', {
    /* you can also use additional validation options, like "groups" in your custom validation decorators. "each" is not supported */
    message: 'Wrong Object Id',
  })
  id: string;
}
