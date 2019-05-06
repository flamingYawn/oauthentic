import { getRepository } from 'typeorm';
import signale from 'signale';

import { RefreshToken } from '../entity/RefreshToken.entity';

class RefreshTokens {

  static find = async (token: string): Promise<RefreshTokens.ReturnValue> => {

    try {
      return await getRepository(RefreshToken).findOne({ token });
    } catch (error) {
      signale.error('[RefreshTokensOperationError :: find');
      throw error;
    }
    
  }

  static findByUserIdAndClientId = async (userId: string, clientId: string)
  : Promise<RefreshTokens.ReturnValue> => {

    try {
      return await getRepository(RefreshToken).findOne({ clientId, userId });
    } catch (error) {
      signale.error('[RefreshTokensOperationError :: findByUserIdAndClientId]');
      throw error;
    }

  }

  static save = async (token: string, userId: string | null, clientId: string)
  : Promise<RefreshTokens.ReturnValue> => {

    const refreshToken = new RefreshToken();
    refreshToken.token = token;
    refreshToken.clientId = clientId;
    
    if (userId) {
      refreshToken.userId = userId;
    }

    try {
      return await getRepository(RefreshToken).save(refreshToken);
    } catch (error) {
      signale.error('[RefreshTokensOperationError :: save]');
      throw error;
    }

  }

  static revokeByUserIdAndClientId = async (userId: string, clientId: string)
  : Promise<RefreshTokens.ReturnValue> => {

    try {
      const repository = getRepository(RefreshToken);
      const refreshToken = await repository.find({ clientId, userId });
      await repository.remove(refreshToken);
    } catch (error) {
      signale.error('[RefreshTokensOperationError :: revokeByUserIdAndClientId]');
      throw error;
    }

    return;
  
  }

}

export default RefreshTokens;
