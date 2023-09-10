import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const CustomConnect= () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const button = buttonRef.current;

      gsap.set(button, { scale: 1 });

      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    }
  }, []);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        // authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected =
          ready &&
          account &&
          chain
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button 
                    ref={buttonRef}
                    onClick={openConnectModal} 
                    className="
                    bg-pink border-2 border-deeppink text-black rounded-md w-[20rem] p-4 text-xl"
                  >
                    Connect
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    className='bg-pink border-2 border-deeppink text-black rounded-md w-[6rem] p-2 text-lg text-center'
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button" className='bg-pink border-2 border-deeppink text-black rounded-md w-[15rem] p-2 text-lg'>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
