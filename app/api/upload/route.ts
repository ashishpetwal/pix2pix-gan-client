export async function POST(req: Request) {
    const { name } = await req.json();

    const lat = name.split('_')[2];
    const long = name.split('_')[3].replace('.png', '');

    console.log('lat', lat);
    console.log('long', long);

    await new Promise(resolve => setTimeout(resolve, 50000));

    const response = `https://3.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/17/${lat}/${long}/256/png8?app_id=pcXBZARHILwXlCihx8d6&token=dzJKV7oQT-zs-vRT_KqiLA&lg=ENG`;

    console.log('response', response);

    return Response.json({
        message: response
    })
}
