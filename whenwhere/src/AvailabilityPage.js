function AvailabilityPage() {
    return(
        <div>
        <h1>Hello world</h1>
            <div className="container fluid">
                <div className="row">
                    <div className="col">
                        <h2>My Availability</h2>
                        <div className="border p-3">
                            <input className="form-range"
                            min={6}
                            max={18}
                            defaultValue={[8, 16]}
                            />
                        </div>
                    </div>

                    <div className="col">
                        <h2>Group Availability</h2>
                        <div className="border p-3">
                            <input className="form-range"
                            min={6}
                            max={18}
                            defaultValue={[8, 16]}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default AvailabilityPage