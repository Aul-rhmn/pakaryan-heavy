"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Copy, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentMethodSelectorProps {
  bookingId: string
  totalAmount: number
}

const BANK_ACCOUNTS = [
  {
    id: "mandiri",
    name: "Bank Mandiri",
    accountNumber: "1370-0123-4567-890",
    accountName: "PT PakaryanHeavyRent",
    logo: "/images/bank-mandiri.png",
    color: "bg-blue-600",
  },
  {
    id: "bca",
    name: "Bank Central Asia (BCA)",
    accountNumber: "5430-1234-567",
    accountName: "PT PakaryanHeavyRent",
    logo: "/images/bank-bca.png",
    color: "bg-blue-500",
  },
  {
    id: "bni",
    name: "Bank Negara Indonesia (BNI)",
    accountNumber: "0123-4567-890",
    accountName: "PT PakaryanHeavyRent",
    logo: "/images/bank-bni.png",
    color: "bg-orange-500",
  },
]

export function PaymentMethodSelector({ bookingId, totalAmount }: PaymentMethodSelectorProps) {
  const router = useRouter()
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [senderName, setSenderName] = useState("")
  const [senderBank, setSenderBank] = useState("")
  const [transferAmount, setTransferAmount] = useState(totalAmount.toString())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedAccount, setCopiedAccount] = useState<string>("")

  const copyToClipboard = async (text: string, bankId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(bankId)
      setTimeout(() => setCopiedAccount(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handlePaymentSubmit = async () => {
    if (!selectedBank || !senderName || !senderBank) {
      setError("Please fill in all required fields")
      return
    }

    if (Number.parseInt(transferAmount) !== totalAmount) {
      setError("Transfer amount must match the total amount")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const selectedBankData = BANK_ACCOUNTS.find((bank) => bank.id === selectedBank)

      // Update booking with payment information
      const { error: updateError } = await supabase
        .from("bookings")
        .update({
          payment_status: "pending_verification",
          payment_method: `bank_transfer_${selectedBank}`,
          payment_reference: `${senderName}_${Date.now()}`,
        })
        .eq("id", bookingId)

      if (updateError) throw updateError

      // Redirect to payment confirmation
      router.push(`/payment/confirmation/${bookingId}`)
    } catch (error: any) {
      console.error("Payment submission error:", error)
      setError(error.message || "Failed to submit payment information")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Select Bank Transfer Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {BANK_ACCOUNTS.map((bank) => (
              <div
                key={bank.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedBank === bank.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedBank(bank.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${bank.color} rounded-lg flex items-center justify-center`}>
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{bank.name}</h3>
                      <p className="text-sm text-slate-600">Transfer to our account</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedBank === bank.id ? "border-orange-500 bg-orange-500" : "border-slate-300"
                    }`}
                  >
                    {selectedBank === bank.id && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bank Account Details */}
      {selectedBank && (
        <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const bank = BANK_ACCOUNTS.find((b) => b.id === selectedBank)!
              return (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Bank Name</span>
                    </div>
                    <p className="font-bold text-slate-900">{bank.name}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Account Number</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(bank.accountNumber, bank.id)}
                        className="h-6 px-2"
                      >
                        {copiedAccount === bank.id ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <p className="font-mono text-lg font-bold text-slate-900">{bank.accountNumber}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Account Name</span>
                    </div>
                    <p className="font-bold text-slate-900">{bank.accountName}</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-700">Transfer Amount</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(totalAmount.toString(), "amount")}
                        className="h-6 px-2"
                      >
                        {copiedAccount === "amount" ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <p className="font-mono text-xl font-bold text-orange-600">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Transfer Confirmation Form */}
      {selectedBank && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Your Transfer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="sender-name">Your Full Name *</Label>
                <Input
                  id="sender-name"
                  placeholder="Enter your full name as shown in your bank account"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Must match the name on your bank account</p>
              </div>

              <div>
                <Label htmlFor="sender-bank">Your Bank Name *</Label>
                <Input
                  id="sender-bank"
                  placeholder="e.g., Bank Mandiri, BCA, BNI, BRI"
                  value={senderBank}
                  onChange={(e) => setSenderBank(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="transfer-amount">Transfer Amount *</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Must match exactly: Rp {totalAmount.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <Separator />

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Transfer Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Transfer the exact amount to the account above</li>
                <li>Keep your transfer receipt</li>
                <li>Fill in the form above with your transfer details</li>
                <li>Click "Confirm Payment" below</li>
                <li>We'll verify your payment within 1-2 hours</li>
              </ol>
            </div>

            <Button
              onClick={handlePaymentSubmit}
              disabled={isLoading || !selectedBank || !senderName || !senderBank}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? "Processing..." : "Confirm Payment"}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              By confirming payment, you acknowledge that you have transferred the amount to our account. Payment
              verification may take 1-2 hours during business hours.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
