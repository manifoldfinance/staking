import { invariant } from './useWalletModal';

test('should throw on failed condition', () => {
  expect(() => {
    return invariant(false, 'fail');
  }).toThrow('Invariant failed: fail');
});

test('should not throw on passed condition', () => {
  expect(() => {
    invariant(true, 'pass');
  }).not.toThrow();
});
