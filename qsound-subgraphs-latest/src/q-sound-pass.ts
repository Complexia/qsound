import { BigInt } from "@graphprotocol/graph-ts";

import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  FundsClaimed as FundsClaimedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  SoundPassClaimed as SoundPassClaimedEvent,
  SoundPassFeeSet as SoundPassFeeSetEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
} from "../generated/QSoundPass/QSoundPass";
import { QSoundPremium, Env } from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {}

export function handleFundsClaimed(event: FundsClaimedEvent): void {}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handlePaused(event: PausedEvent): void {
  let zero = BigInt.fromI32(0);
  let env = Env.load(zero.toHexString());
  if (!env) {
    env = new Env(zero.toHexString());
  }
  env.premiumPaused = true;
  env.save();
}

export function handleSoundPassClaimed(event: SoundPassClaimedEvent): void {
  let soundPass = QSoundPremium.load(event.params.tokenId.toHexString());
  if (!soundPass) {
    soundPass = new QSoundPremium(event.params.tokenId.toHexString());
  }
  soundPass.owner = event.params.claimer;
  soundPass.mintedAt = event.params.timestamp;
  soundPass.save();
}

export function handleSoundPassFeeSet(event: SoundPassFeeSetEvent): void {
  let zero = BigInt.fromI32(0);
  let env = Env.load(zero.toHexString());
  if (!env) {
    env = new Env(zero.toHexString());
  }
  env.premiumFee = event.params.newFee;
  env.premiumPaused=false;
  env.save();
}

export function handleTransfer(event: TransferEvent): void {}

export function handleUnpaused(event: UnpausedEvent): void {
  let zero = BigInt.fromI32(0);
  let env = Env.load(zero.toHexString());
  if (!env) {
    env = new Env(zero.toHexString());
  }
  env.premiumPaused = false;
  env.save();
}