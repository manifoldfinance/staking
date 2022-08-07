import { errorCodes, getMessageFromCode, serializeError } from 'eth-rpc-errors';
import toast from 'react-hot-toast';

export default function handleError(error: any, id: string) {
  console.error(error);

  let errorMessage = error?.message ?? 'Something Went Wrong';

  if ('code' in error) {
    const _error = serializeError(error);

    console.error('Serialized Error:', _error);

    if (_error.code === errorCodes.provider.userRejectedRequest) {
      toast.dismiss(id);

      return;
    } else {
      errorMessage = getMessageFromCode(_error.code);

      toast.error(errorMessage, { id });
    }
  } else {
    toast.error(errorMessage, { id });
  }
}
