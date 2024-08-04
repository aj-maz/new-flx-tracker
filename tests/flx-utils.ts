import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  Burn,
  DelegateChanged,
  DelegateVotesChanged,
  LogNote,
  LogSetAuthority,
  LogSetOwner,
  Mint,
  Transfer
} from "../generated/FLX/FLX"

export function createApprovalEvent(
  src: Address,
  guy: Address,
  wad: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("src", ethereum.Value.fromAddress(src))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("guy", ethereum.Value.fromAddress(guy))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )

  return approvalEvent
}

export function createBurnEvent(guy: Address, wad: BigInt): Burn {
  let burnEvent = changetype<Burn>(newMockEvent())

  burnEvent.parameters = new Array()

  burnEvent.parameters.push(
    new ethereum.EventParam("guy", ethereum.Value.fromAddress(guy))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )

  return burnEvent
}

export function createDelegateChangedEvent(
  delegator: Address,
  fromDelegate: Address,
  toDelegate: Address
): DelegateChanged {
  let delegateChangedEvent = changetype<DelegateChanged>(newMockEvent())

  delegateChangedEvent.parameters = new Array()

  delegateChangedEvent.parameters.push(
    new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
  )
  delegateChangedEvent.parameters.push(
    new ethereum.EventParam(
      "fromDelegate",
      ethereum.Value.fromAddress(fromDelegate)
    )
  )
  delegateChangedEvent.parameters.push(
    new ethereum.EventParam(
      "toDelegate",
      ethereum.Value.fromAddress(toDelegate)
    )
  )

  return delegateChangedEvent
}

export function createDelegateVotesChangedEvent(
  delegate: Address,
  previousBalance: BigInt,
  newBalance: BigInt
): DelegateVotesChanged {
  let delegateVotesChangedEvent = changetype<DelegateVotesChanged>(
    newMockEvent()
  )

  delegateVotesChangedEvent.parameters = new Array()

  delegateVotesChangedEvent.parameters.push(
    new ethereum.EventParam("delegate", ethereum.Value.fromAddress(delegate))
  )
  delegateVotesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousBalance",
      ethereum.Value.fromUnsignedBigInt(previousBalance)
    )
  )
  delegateVotesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newBalance",
      ethereum.Value.fromUnsignedBigInt(newBalance)
    )
  )

  return delegateVotesChangedEvent
}

export function createLogNoteEvent(
  sig: Bytes,
  guy: Address,
  foo: Bytes,
  bar: Bytes,
  wad: BigInt,
  fax: Bytes
): LogNote {
  let logNoteEvent = changetype<LogNote>(newMockEvent())

  logNoteEvent.parameters = new Array()

  logNoteEvent.parameters.push(
    new ethereum.EventParam("sig", ethereum.Value.fromFixedBytes(sig))
  )
  logNoteEvent.parameters.push(
    new ethereum.EventParam("guy", ethereum.Value.fromAddress(guy))
  )
  logNoteEvent.parameters.push(
    new ethereum.EventParam("foo", ethereum.Value.fromFixedBytes(foo))
  )
  logNoteEvent.parameters.push(
    new ethereum.EventParam("bar", ethereum.Value.fromFixedBytes(bar))
  )
  logNoteEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )
  logNoteEvent.parameters.push(
    new ethereum.EventParam("fax", ethereum.Value.fromBytes(fax))
  )

  return logNoteEvent
}

export function createLogSetAuthorityEvent(
  authority: Address
): LogSetAuthority {
  let logSetAuthorityEvent = changetype<LogSetAuthority>(newMockEvent())

  logSetAuthorityEvent.parameters = new Array()

  logSetAuthorityEvent.parameters.push(
    new ethereum.EventParam("authority", ethereum.Value.fromAddress(authority))
  )

  return logSetAuthorityEvent
}

export function createLogSetOwnerEvent(owner: Address): LogSetOwner {
  let logSetOwnerEvent = changetype<LogSetOwner>(newMockEvent())

  logSetOwnerEvent.parameters = new Array()

  logSetOwnerEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return logSetOwnerEvent
}

export function createMintEvent(guy: Address, wad: BigInt): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("guy", ethereum.Value.fromAddress(guy))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )

  return mintEvent
}

export function createTransferEvent(
  src: Address,
  dst: Address,
  wad: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("src", ethereum.Value.fromAddress(src))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("dst", ethereum.Value.fromAddress(dst))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
  )

  return transferEvent
}
