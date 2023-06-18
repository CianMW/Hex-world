

export default function SettingsContainer () {

    return(
        <div className="container">
        <div className="m-1">
            <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#gridSettingsModal">
                Grid
            </button>
            <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#elevationModal">
                Elevation
            </button>
            <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#moistureModal">
                Moisture
            </button>
            <button type="button" className="btn btn-primary m-1" >
                Download as PNG
            </button>
            <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#mapHashModal">
                Map Hash
            </button>
            <button type="button" className="btn btn-success m-1 float-right" id="reset">
                Reset
            </button>
            <button type="button" className="btn btn-success m-1 float-right" id="redraw">
                Redraw
            </button>
        </div>
    </div>
    )
}