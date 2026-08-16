import "./Sectionheader.css";

function SectionHeader({

    number,
    eyebrow,
    titleBold,
    titleAccent,
    subtitle,
    theme = "dark"

}) {

    return (

        <div className={`section-header section-header-${theme}`}>

            <div className="section-header-main">

                <span className="section-header-eyebrow">

                    <strong>{number}</strong> / {eyebrow}

                </span>

                <h2 className="section-header-title">

                    {titleBold}

                    {titleAccent && (

                        <>
                            <br />
                            <em>{titleAccent}</em>
                        </>

                    )}

                </h2>

            </div>

            {subtitle && (

                <p className="section-header-subtitle">

                    {subtitle}

                </p>

            )}

        </div>

    );

}

export default SectionHeader;