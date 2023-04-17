import {
  L1ToL2MessageReaderClassicWithNetwork,
  L1ToL2MessageReaderWithNetwork,
} from '@/types';
import { constants } from 'ethers';
import { hexDataSlice } from 'ethers/lib/utils.js';

export const looksLikeCallToInboxethDeposit = async (
  l1ToL2Message:
    | L1ToL2MessageReaderWithNetwork
    | L1ToL2MessageReaderClassicWithNetwork,
) => {
  const txData = (
    await l1ToL2Message.l2Provider.getTransaction(
      l1ToL2Message.retryableCreationId,
    )
  ).data;
  // check that calldataSize param is zero (8th 32-byte param, offset by 4 bytes for message ID):
  return hexDataSlice(txData, 4 + 8 * 32, 4 + 9 * 32) === constants.HashZero;
};