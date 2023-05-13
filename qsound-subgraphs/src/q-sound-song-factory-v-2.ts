import {
  IncomeClaimed as IncomeClaimedEvent,
  MintCountUpdated as MintCountUpdatedEvent,
  MintPaused as MintPausedEvent,
  MintStarted as MintStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  QSoundSongV2Created as QSoundSongV2CreatedEvent,
  TokenMinted as TokenMintedEvent,
  TokenPriceUpdated as TokenPriceUpdatedEvent,
  TokenURIUpdated as TokenURIUpdatedEvent
} from "../generated/QSoundSongFactoryV2/QSoundSongFactoryV2"
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
} from "../generated/schema"

export function handleIncomeClaimed(event: IncomeClaimedEvent): void {
  let entity = new IncomeClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount
  entity.claimer = event.params.claimer
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintCountUpdated(event: MintCountUpdatedEvent): void {
  let entity = new MintCountUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.newMintCount = event.params.newMintCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintPaused(event: MintPausedEvent): void {
  let entity = new MintPaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintStarted(event: MintStartedEvent): void {
  let entity = new MintStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleQSoundSongV2Created(
  event: QSoundSongV2CreatedEvent
): void {
  let entity = new QSoundSongV2Created(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.songContract = event.params.songContract
  entity.owner = event.params.owner
  entity.mintPrice = event.params.mintPrice
  entity.tokenCount = event.params.tokenCount
  entity.allowMint = event.params.allowMint
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenMinted(event: TokenMintedEvent): void {
  let entity = new TokenMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.account = event.params.account
  entity.tokenId = event.params.tokenId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenPriceUpdated(event: TokenPriceUpdatedEvent): void {
  let entity = new TokenPriceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenURIUpdated(event: TokenURIUpdatedEvent): void {
  let entity = new TokenURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.newUri = event.params.newUri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
