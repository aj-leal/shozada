import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"


const PayPalButton = ({ amount, onSuccess, onError }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AcUuEvSHrLcJy7ZrO81hQsBoRP1zRBgkGE8h8kRPejBgE2RVWYB8xyNbsfs4DemH0SZYDPPJn4xvuFgg" }}>
            <PayPalButtons style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: amount } }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(onSuccess)
                }}
                onError={onError}
            />
        </PayPalScriptProvider>
    )
}

export default PayPalButton
