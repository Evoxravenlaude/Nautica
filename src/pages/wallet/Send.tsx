import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, QrCode, AlertCircle, ChevronDown } from "lucide-react";
import { useAccount, useBalance } from "wagmi";
import { isAddress } from "viem";
import TokenSelector from "@/components/TokenSelector";
import { FALLBACK_TOKENS, type Token } from "@/lib/token-list";

export default function Send() {
  const { address, isConnected } = useAccount();
  const [selectedToken, setSelectedToken] = useState<Token>(FALLBACK_TOKENS[0]);
  const [amount,        setAmount]        = useState("");
  const [recipient,     setRecipient]     = useState("");
  const [recipientErr,  setRecipientErr]  = useState("");
  const [showSelector,  setShowSelector]  = useState(false);

  const isETH     = selectedToken.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const tokenAddr = isETH ? undefined : selectedToken.address as `0x${string}`;

  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
    token: tokenAddr,
    query: { enabled: !!address },
  });

  const balFmt = balance
    ? parseFloat(balance.formatted).toFixed(balance.decimals <= 6 ? 2 : 6)
    : "—";

  useEffect(() => {
    if (!recipient) { setRecipientErr(""); return; }
    setRecipientErr(isAddress(recipient) ? "" : "Invalid Ethereum address");
  }, [recipient]);

  const parsedAmt = parseFloat(amount);
  const parsedBal = balance ? parseFloat(balance.formatted) : 0;
  const exceeds   = parsedAmt > parsedBal;

  const canReview =
    isConnected && parsedAmt > 0 && !exceeds &&
    isAddress(recipient) && balance !== undefined;

  if (!isConnected) return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center gap-4 px-4">
      <AlertCircle size={32} className="text-text-tertiary" />
      <p className="font-mono text-sm text-text-secondary">Connect your wallet to send tokens.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-void px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/wallet-home" className="text-text-secondary hover:text-text-primary">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-heading text-xl text-text-primary">Send</h1>
        </div>

        {/* Token selector */}
        <div className="mb-6">
          <label className="block font-mono text-xs text-text-secondary mb-2">Token</label>
          <button
            onClick={() => setShowSelector(true)}
            className="w-full flex items-center gap-3 p-4 bg-obsidian border border-white/10 hover:border-cyan/30 transition-colors"
            aria-label="Select token to send"
          >
            {selectedToken.logoURI
              ? <img src={selectedToken.logoURI} className="w-8 h-8 rounded-full flex-shrink-0" alt="" />
              : <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm text-cyan">{selectedToken.symbol[0]}</span>
                </div>
            }
            <div className="flex-1 text-left">
              <p className="font-body text-sm text-text-primary">{selectedToken.symbol}</p>
              <p className="font-mono text-[10px] text-text-tertiary truncate">{selectedToken.name}</p>
            </div>
            <div className="text-right mr-2">
              <p className="font-mono text-xs text-text-secondary">
                {balanceLoading ? "Loading…" : `${balFmt} ${selectedToken.symbol}`}
              </p>
            </div>
            <ChevronDown size={16} className="text-text-tertiary flex-shrink-0" />
          </button>
        </div>

        {/* Recipient */}
        <div className="mb-6">
          <label className="block font-mono text-xs text-text-secondary mb-2">Recipient Address</label>
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value.trim())}
              className={`w-full bg-obsidian border pl-4 pr-12 py-4 text-text-primary font-mono text-sm
                placeholder:text-text-tertiary focus:outline-none transition-colors
                ${recipientErr ? "border-red-500/50" : "border-white/10 focus:border-cyan"}`}
              placeholder="0x…"
              aria-label="Recipient address"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-cyan" aria-label="Scan QR">
              <QrCode size={18} />
            </button>
          </div>
          {recipientErr && <p className="mt-1 font-mono text-[10px] text-red-400">{recipientErr}</p>}
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block font-mono text-xs text-text-secondary mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full bg-obsidian border px-4 py-4 text-text-primary font-mono text-lg
                placeholder:text-text-tertiary focus:outline-none transition-colors
                ${exceeds ? "border-red-500/50" : "border-white/10 focus:border-cyan"}`}
              placeholder="0.0"
              aria-label="Amount to send"
            />
            <button
              onClick={() => balance && setAmount(balance.formatted)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan font-mono text-xs hover:opacity-80"
              aria-label="Use max balance"
            >MAX</button>
          </div>
          {exceeds && <p className="mt-1 font-mono text-[10px] text-red-400">Insufficient balance</p>}
        </div>

        {canReview ? (
          <Link
            to="/send-review"
            state={{
              token:         selectedToken.symbol,
              tokenAddress:  isETH ? null : selectedToken.address,
              tokenDecimals: selectedToken.decimals,
              amount,
              recipient,
              balanceFormatted: balFmt,
            }}
            className="flex items-center justify-center w-full py-4 bg-cyan text-void font-mono text-sm tracking-wider font-medium hover:bg-opacity-90 transition-all"
          >Review</Link>
        ) : (
          <button disabled className="w-full py-4 bg-white/5 text-text-tertiary font-mono text-sm cursor-not-allowed">
            {!parsedAmt ? "Enter an amount" : exceeds ? "Insufficient balance" : recipientErr || "Enter a valid address"}
          </button>
        )}
      </div>

      <TokenSelector
        open={showSelector}
        onClose={() => setShowSelector(false)}
        onSelect={(t) => { setSelectedToken(t); setAmount(""); }}
        title="Select Token to Send"
      />
    </div>
  );
}
