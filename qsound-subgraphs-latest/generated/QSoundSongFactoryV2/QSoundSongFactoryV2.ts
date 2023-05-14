// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class IncomeClaimed extends ethereum.Event {
  get params(): IncomeClaimed__Params {
    return new IncomeClaimed__Params(this);
  }
}

export class IncomeClaimed__Params {
  _event: IncomeClaimed;

  constructor(event: IncomeClaimed) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get claimer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get timestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class MintCountUpdated extends ethereum.Event {
  get params(): MintCountUpdated__Params {
    return new MintCountUpdated__Params(this);
  }
}

export class MintCountUpdated__Params {
  _event: MintCountUpdated;

  constructor(event: MintCountUpdated) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newMintCount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class MintPaused extends ethereum.Event {
  get params(): MintPaused__Params {
    return new MintPaused__Params(this);
  }
}

export class MintPaused__Params {
  _event: MintPaused;

  constructor(event: MintPaused) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class MintStarted extends ethereum.Event {
  get params(): MintStarted__Params {
    return new MintStarted__Params(this);
  }
}

export class MintStarted__Params {
  _event: MintStarted;

  constructor(event: MintStarted) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class QSoundSongV2Created extends ethereum.Event {
  get params(): QSoundSongV2Created__Params {
    return new QSoundSongV2Created__Params(this);
  }
}

export class QSoundSongV2Created__Params {
  _event: QSoundSongV2Created;

  constructor(event: QSoundSongV2Created) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get songContract(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get uri(): string {
    return this._event.parameters[3].value.toString();
  }

  get mintPrice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get tokenCount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get allowMint(): boolean {
    return this._event.parameters[6].value.toBoolean();
  }

  get timestamp(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class TokenMinted extends ethereum.Event {
  get params(): TokenMinted__Params {
    return new TokenMinted__Params(this);
  }
}

export class TokenMinted__Params {
  _event: TokenMinted;

  constructor(event: TokenMinted) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get timestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class TokenPriceUpdated extends ethereum.Event {
  get params(): TokenPriceUpdated__Params {
    return new TokenPriceUpdated__Params(this);
  }
}

export class TokenPriceUpdated__Params {
  _event: TokenPriceUpdated;

  constructor(event: TokenPriceUpdated) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newPrice(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TokenURIUpdated extends ethereum.Event {
  get params(): TokenURIUpdated__Params {
    return new TokenURIUpdated__Params(this);
  }
}

export class TokenURIUpdated__Params {
  _event: TokenURIUpdated;

  constructor(event: TokenURIUpdated) {
    this._event = event;
  }

  get songId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newUri(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class QSoundSongFactoryV2 extends ethereum.SmartContract {
  static bind(address: Address): QSoundSongFactoryV2 {
    return new QSoundSongFactoryV2("QSoundSongFactoryV2", address);
  }

  getCreateSongFee(): BigInt {
    let result = super.call(
      "getCreateSongFee",
      "getCreateSongFee():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCreateSongFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCreateSongFee",
      "getCreateSongFee():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tokenURI(songId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(songId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(songId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(songId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _createSongFee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClaimIncomeCall extends ethereum.Call {
  get inputs(): ClaimIncomeCall__Inputs {
    return new ClaimIncomeCall__Inputs(this);
  }

  get outputs(): ClaimIncomeCall__Outputs {
    return new ClaimIncomeCall__Outputs(this);
  }
}

export class ClaimIncomeCall__Inputs {
  _call: ClaimIncomeCall;

  constructor(call: ClaimIncomeCall) {
    this._call = call;
  }
}

export class ClaimIncomeCall__Outputs {
  _call: ClaimIncomeCall;

  constructor(call: ClaimIncomeCall) {
    this._call = call;
  }
}

export class CreateQSoundSongV2Call extends ethereum.Call {
  get inputs(): CreateQSoundSongV2Call__Inputs {
    return new CreateQSoundSongV2Call__Inputs(this);
  }

  get outputs(): CreateQSoundSongV2Call__Outputs {
    return new CreateQSoundSongV2Call__Outputs(this);
  }
}

export class CreateQSoundSongV2Call__Inputs {
  _call: CreateQSoundSongV2Call;

  constructor(call: CreateQSoundSongV2Call) {
    this._call = call;
  }

  get _uri(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _mintCount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _tokenPrice(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _allowMint(): boolean {
    return this._call.inputValues[3].value.toBoolean();
  }
}

export class CreateQSoundSongV2Call__Outputs {
  _call: CreateQSoundSongV2Call;

  constructor(call: CreateQSoundSongV2Call) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get songId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }
}

export class PauseMintCall extends ethereum.Call {
  get inputs(): PauseMintCall__Inputs {
    return new PauseMintCall__Inputs(this);
  }

  get outputs(): PauseMintCall__Outputs {
    return new PauseMintCall__Outputs(this);
  }
}

export class PauseMintCall__Inputs {
  _call: PauseMintCall;

  constructor(call: PauseMintCall) {
    this._call = call;
  }

  get songId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PauseMintCall__Outputs {
  _call: PauseMintCall;

  constructor(call: PauseMintCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetCreateSongFeeCall extends ethereum.Call {
  get inputs(): SetCreateSongFeeCall__Inputs {
    return new SetCreateSongFeeCall__Inputs(this);
  }

  get outputs(): SetCreateSongFeeCall__Outputs {
    return new SetCreateSongFeeCall__Outputs(this);
  }
}

export class SetCreateSongFeeCall__Inputs {
  _call: SetCreateSongFeeCall;

  constructor(call: SetCreateSongFeeCall) {
    this._call = call;
  }

  get _newCreateSongFee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetCreateSongFeeCall__Outputs {
  _call: SetCreateSongFeeCall;

  constructor(call: SetCreateSongFeeCall) {
    this._call = call;
  }
}

export class SetMintCountCall extends ethereum.Call {
  get inputs(): SetMintCountCall__Inputs {
    return new SetMintCountCall__Inputs(this);
  }

  get outputs(): SetMintCountCall__Outputs {
    return new SetMintCountCall__Outputs(this);
  }
}

export class SetMintCountCall__Inputs {
  _call: SetMintCountCall;

  constructor(call: SetMintCountCall) {
    this._call = call;
  }

  get songId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _mintCount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetMintCountCall__Outputs {
  _call: SetMintCountCall;

  constructor(call: SetMintCountCall) {
    this._call = call;
  }
}

export class SetMintPriceCall extends ethereum.Call {
  get inputs(): SetMintPriceCall__Inputs {
    return new SetMintPriceCall__Inputs(this);
  }

  get outputs(): SetMintPriceCall__Outputs {
    return new SetMintPriceCall__Outputs(this);
  }
}

export class SetMintPriceCall__Inputs {
  _call: SetMintPriceCall;

  constructor(call: SetMintPriceCall) {
    this._call = call;
  }

  get songId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetMintPriceCall__Outputs {
  _call: SetMintPriceCall;

  constructor(call: SetMintPriceCall) {
    this._call = call;
  }
}

export class SetURICall extends ethereum.Call {
  get inputs(): SetURICall__Inputs {
    return new SetURICall__Inputs(this);
  }

  get outputs(): SetURICall__Outputs {
    return new SetURICall__Outputs(this);
  }
}

export class SetURICall__Inputs {
  _call: SetURICall;

  constructor(call: SetURICall) {
    this._call = call;
  }

  get songId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _newUri(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SetURICall__Outputs {
  _call: SetURICall;

  constructor(call: SetURICall) {
    this._call = call;
  }
}

export class StartMintCall extends ethereum.Call {
  get inputs(): StartMintCall__Inputs {
    return new StartMintCall__Inputs(this);
  }

  get outputs(): StartMintCall__Outputs {
    return new StartMintCall__Outputs(this);
  }
}

export class StartMintCall__Inputs {
  _call: StartMintCall;

  constructor(call: StartMintCall) {
    this._call = call;
  }

  get songId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class StartMintCall__Outputs {
  _call: StartMintCall;

  constructor(call: StartMintCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
