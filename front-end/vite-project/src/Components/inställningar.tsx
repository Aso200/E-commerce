interface SettingProps {
    customerInfo: any
}

function Settings({ customerInfo }: SettingProps) {



    return (
        <>
            <h1>Inställningar</h1>
            <p>Customer name:{customerInfo.name}</p>
            <p>Customer email:{customerInfo.email}</p>

        </>
    )

}


export default Settings;
