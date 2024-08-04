import { BigInt } from "@graphprotocol/graph-ts";
import {
  FLX,
  Approval,
  Burn,
  DelegateChanged,
  DelegateVotesChanged,
  LogNote,
  LogSetAuthority,
  LogSetOwner,
  Mint,
  Transfer,
} from "../generated/FLX/FLX";
import {
  User,
  BalanceHistory,
  VotingPowerHistory,
  Block,
} from "../generated/schema";

export function handleApproval(event: Approval): void {}

export function handleBurn(event: Burn): void {
  let user = User.load(event.params.guy.toHex());
  if (user) {
    user.balance = user.balance.minus(event.params.wad);

    let contract = FLX.bind(event.address);
    let block = new Block(event.block.hash.toHex());
    block.number = event.block.number;
    block.at = event.block.timestamp;
    block.totalSupply = contract.totalSupply();

    let bHistory = BalanceHistory.load(block.id.concat(user.id));
    if (!bHistory) {
      bHistory = new BalanceHistory(block.id.concat(user.id));
    }
    bHistory.user = user.id;
    bHistory.amount = user.balance;
    bHistory.block = block.id;

    block.save();
    user.save();
    bHistory.save();
  }

  /*if (!user) {
    user = new User(event.params.guy.toHex());
    user.balance = user.balance.minus(event.params.wad);
    user.votingPower = BigInt.fromI32(0);
  }*/
}

export function handleDelegateChanged(event: DelegateChanged): void {}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let user = User.load(event.params.delegate.toHex());
  if (!user) {
    user = new User(event.params.delegate.toHex());
    user.balance = BigInt.fromI32(0);
  }
  user.votingPower = event.params.newBalance;

  let contract = FLX.bind(event.address);
  let block = new Block(event.block.hash.toHex());
  block.number = event.block.number;
  block.at = event.block.timestamp;
  block.totalSupply = contract.totalSupply();

  let vpHistory = VotingPowerHistory.load(block.id.concat(user.id));
  if (!vpHistory) {
    vpHistory = new VotingPowerHistory(block.id.concat(user.id));
  }

  vpHistory.user = user.id;
  vpHistory.amount = user.votingPower;
  vpHistory.block = block.id;

  block.save();
  vpHistory.save();
  user.save();
}

export function handleLogNote(event: LogNote): void {}

export function handleLogSetAuthority(event: LogSetAuthority): void {}

export function handleLogSetOwner(event: LogSetOwner): void {}

export function handleMint(event: Mint): void {
  let user = User.load(event.params.guy.toHex());
  if (!user) {
    user = new User(event.params.guy.toHex());
    user.votingPower = BigInt.fromI32(0);
    user.balance = BigInt.fromI32(0);
  }
  user.balance = user.balance.plus(event.params.wad);

  let contract = FLX.bind(event.address);
  let block = new Block(event.block.hash.toHex());
  block.number = event.block.number;
  block.at = event.block.timestamp;
  block.totalSupply = contract.totalSupply();

  let bHistory = BalanceHistory.load(block.id.concat(user.id));
  if (!bHistory) {
    bHistory = new BalanceHistory(block.id.concat(user.id));
  }

  bHistory.user = user.id;
  bHistory.amount = user.balance;
  bHistory.block = block.id;

  user.save();
  block.save();
  bHistory.save();
}

export function handleTransfer(event: Transfer): void {
  let contract = FLX.bind(event.address);
  let block = new Block(event.block.hash.toHex());
  block.at = event.block.timestamp;
  block.number = event.block.number;
  block.totalSupply = contract.totalSupply();
  block.save();

  let receiver = User.load(event.params.dst.toHex());
  if (!receiver) {
    receiver = new User(event.params.dst.toHex());
    receiver.balance = BigInt.fromI32(0);
    receiver.votingPower = BigInt.fromI32(0);
  }
  receiver.balance = receiver.balance.plus(event.params.wad);
  receiver.save();

  let bHistoryRecv = BalanceHistory.load(block.id.concat(receiver.id));
  if (!bHistoryRecv) {
    bHistoryRecv = new BalanceHistory(block.id.concat(receiver.id));
  }
  bHistoryRecv.user = receiver.id;
  bHistoryRecv.amount = receiver.balance;
  bHistoryRecv.block = block.id;
  bHistoryRecv.save();

  let sender = User.load(event.params.src.toHex());
  if (sender) {
    sender.balance = sender.balance.minus(event.params.wad);
    sender.save();
    let bHistorySender = BalanceHistory.load(block.id.concat(sender.id));
    if (!bHistorySender) {
      bHistorySender = new BalanceHistory(block.id.concat(sender.id));
    }

    let contract = FLX.bind(event.address);
    contract.totalSupply;
    bHistorySender.user = sender.id;
    bHistorySender.amount = sender.balance;
    bHistorySender.block = block.id;
    bHistorySender.save();
  }
}
