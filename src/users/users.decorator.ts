import { createParamDecorator } from '@nestjs/common';

export const Users = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
});
