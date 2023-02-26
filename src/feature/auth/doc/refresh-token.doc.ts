import { ApiProperty } from '@nestjs/swagger';

class DataResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......' })
  refreshToken: string;
}

export class RefreshTokenResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty()
  data: DataResponse;
}
