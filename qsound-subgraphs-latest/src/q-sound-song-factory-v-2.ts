import { BigInt } from "@graphprotocol/graph-ts";
import {
  QSoundSongFactoryV2,
  IncomeClaimed,
  MintCountUpdated,
  MintPaused,
  MintStarted,
  OwnershipTransferred,
  QSoundSongV2Created,
  TokenMinted,
  TokenPriceUpdated,
  TokenURIUpdated,
} from "../generated/QSoundSongFactoryV2/QSoundSongFactoryV2";
import { QSound, QSoundNFT } from "../generated/schema";

export function handleIncomeClaimed(event: IncomeClaimed): void {}

export function handleMintCountUpdated(event: MintCountUpdated): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.totalMint = event.params.newMintCount;
  qsound.save();
}

export function handleMintPaused(event: MintPaused): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.isPaused = true;
  qsound.save();
}

export function handleMintStarted(event: MintStarted): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.isPaused = false;
  qsound.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleQSoundSongV2Created(event: QSoundSongV2Created): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.currentMint = BigInt.fromI32(0);
  qsound.contract = event.params.songContract;
  qsound.totalMint = event.params.tokenCount;
  qsound.isPaused = event.params.allowMint;
  qsound.artist = event.params.owner;
  qsound.mintPrice = event.params.mintPrice;
  qsound.createdAt = event.params.timestamp;
  qsound.save();
}

export function handleTokenMinted(event: TokenMinted): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.currentMint = qsound.currentMint.plus(BigInt.fromI32(1));
  qsound.save();
  let qsoundNFT = QSoundNFT.load(
    event.params.songId.toHexString() + event.params.account.toHexString()
  );
  if (!qsoundNFT) {
    qsoundNFT = new QSoundNFT(
      event.params.songId.toHexString() + event.params.account.toHexString()
    );
  }
  qsoundNFT.song = qsound.id;
  qsoundNFT.mintedAt = event.params.timestamp;
  qsoundNFT.owner = event.params.account;
  qsoundNFT.save();
}

export function handleTokenPriceUpdated(event: TokenPriceUpdated): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.mintPrice = event.params.newPrice;
  qsound.save();
}

export function handleTokenURIUpdated(event: TokenURIUpdated): void {
  let qsound = QSound.load(event.params.songId.toHexString());
  if (!qsound) {
    qsound = new QSound(event.params.songId.toHexString());
  }
  qsound.uri = event.params.newUri;
  qsound.save();
}