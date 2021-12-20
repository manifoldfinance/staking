import {Transition} from '@headlessui/react';
import Spinner from 'react-spinner-material';

export function TxPendingModal({txPending}: { txPending: string }) {

    return (
        <Transition
            show={txPending !== ''}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={"absolute right-6 p-2 text-center bg-white rounded-lg border shadow-2xl top-18"}>
                <a className={"text-blue-400 underline"} href={'https://etherscan.io/tx/'+txPending} target={"_blank"}>Transaction sent.</a>
                <h3>Waiting for confirmation...</h3>
                <div className={"pl-20"}>
                    <Spinner radius={40} color={"#333"} stroke={2} visible={true}/>
                </div>
            </div>
        </Transition>
    )
}