import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  IncomeClaimed,
  MintCountUpdated,
  MintPaused,
  MintStarted,
  OwnershipTransferred,
  QSoundSongV2Created,
  TokenMinted,
  TokenPriceUpdated,
  TokenURIUpdated
} from "../generated/QSoundSongFactoryV2/QSoundSongFactoryV2"

export function createIncomeClaimedEvent(
  amount: BigInt,
  claimer: Address,
  timestamp: BigInt
): IncomeClaimed {
  let incomeClaimedEvent = changetype<IncomeClaimed>(newMockEvent())

  incomeClaimedEvent.parameters = new Array()

  incomeClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  incomeClaimedEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )
  incomeClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return incomeClaimedEvent
}

export function createMintCountUpdatedEvent(
  songId: BigInt,
  newMintCount: BigInt
): MintCountUpdated {
  let mintCountUpdatedEvent = changetype<MintCountUpdated>(newMockEvent())

  mintCountUpdatedEvent.parameters = new Array()

  mintCountUpdatedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  mintCountUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newMintCount",
      ethereum.Value.fromUnsignedBigInt(newMintCount)
    )
  )

  return mintCountUpdatedEvent
}

export function createMintPausedEvent(
  songId: BigInt,
  timestamp: BigInt
): MintPaused {
  let mintPausedEvent = changetype<MintPaused>(newMockEvent())

  mintPausedEvent.parameters = new Array()

  mintPausedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  mintPausedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return mintPausedEvent
}

export function createMintStartedEvent(
  songId: BigInt,
  timestamp: BigInt
): MintStarted {
  let mintStartedEvent = changetype<MintStarted>(newMockEvent())

  mintStartedEvent.parameters = new Array()

  mintStartedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  mintStartedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return mintStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createQSoundSongV2CreatedEvent(
  songId: BigInt,
  songContract: Address,
  owner: Address,
  mintPrice: BigInt,
  tokenCount: BigInt,
  allowMint: boolean,
  timestamp: BigInt
): QSoundSongV2Created {
  let qSoundSongV2CreatedEvent = changetype<QSoundSongV2Created>(newMockEvent())

  qSoundSongV2CreatedEvent.parameters = new Array()

  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam(
      "songContract",
      ethereum.Value.fromAddress(songContract)
    )
  )
  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam(
      "mintPrice",
      ethereum.Value.fromUnsignedBigInt(mintPrice)
    )
  )
  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenCount",
      ethereum.Value.fromUnsignedBigInt(tokenCount)
    )
  )
  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam("allowMint", ethereum.Value.fromBoolean(allowMint))
  )
  qSoundSongV2CreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return qSoundSongV2CreatedEvent
}

export function createTokenMintedEvent(
  songId: BigInt,
  account: Address,
  tokenId: BigInt,
  timestamp: BigInt
): TokenMinted {
  let tokenMintedEvent = changetype<TokenMinted>(newMockEvent())

  tokenMintedEvent.parameters = new Array()

  tokenMintedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  tokenMintedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  tokenMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenMintedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return tokenMintedEvent
}

export function createTokenPriceUpdatedEvent(
  songId: BigInt,
  newPrice: BigInt
): TokenPriceUpdated {
  let tokenPriceUpdatedEvent = changetype<TokenPriceUpdated>(newMockEvent())

  tokenPriceUpdatedEvent.parameters = new Array()

  tokenPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  tokenPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return tokenPriceUpdatedEvent
}

export function createTokenURIUpdatedEvent(
  songId: BigInt,
  newUri: string
): TokenURIUpdated {
  let tokenUriUpdatedEvent = changetype<TokenURIUpdated>(newMockEvent())

  tokenUriUpdatedEvent.parameters = new Array()

  tokenUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  tokenUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("newUri", ethereum.Value.fromString(newUri))
  )

  return tokenUriUpdatedEvent
}
