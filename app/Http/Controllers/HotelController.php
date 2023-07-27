<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Http\Resources\AcomodacionResource;
use App\Http\Resources\HotelResource;
use App\Http\Resources\TipoHabitacionResource;
use App\Models\Habitacion;
use App\Models\TipoHabitacion;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return HotelResource::collection(
            Hotel::query()->orderBy('id', 'DESC')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelRequest $request)
    {
        $data = $request->validated();

        $hotel = Hotel::create($data);

        // Crear nuevas habitaciones
        foreach ($data['habitaciones'] as $habitacion) {
            $habitacion['hotel_id'] = $hotel->id;

            $this->createHabitacion($habitacion);
        }

        return new HotelResource($hotel);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        return new HotelResource($hotel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $data = $request->validated();

        $hotel->update($data);

        // Get ids as plain array of existing questions
        $existingIds = $hotel->habitaciones()->pluck('id')->toArray();
        // Get ids as plain array of new questions
        $newIds = Arr::pluck($data['habitaciones'], 'id');
        // Find questions to delete
        $toDelete = array_diff($existingIds, $newIds);
        //Find questions to add
        $toAdd = array_diff($newIds, $existingIds);

        // Delete questions by $toDelete array
        Habitacion::destroy($toDelete);

        // Crearn nuevas habitaciones
        foreach ($data['habitaciones'] as $habitacion) {
            if (in_array($habitacion['id'], $toAdd)) {
                $habitacion['hotel_id'] = $hotel->id;

                $this->createHabitacion($habitacion);
            }
        }

        // Actualizar habitaciones existentes
        $habitacionMap = collect($data['habitaciones'])->keyBy('id');

        foreach ($hotel->habitaciones as $habitacion) {
            if (isset($habitacionMap[$habitacion->id])) {
                $this->updateHabitacion($habitacion, $habitacionMap[$habitacion->id]);
            }
        }

        return new HotelResource($hotel);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        $hotel->delete();

        return response('', 204);
    }

    private function createHabitacion($data)
    {
        $existType = DB::table('acomodacion_tipo_habitaciones')
            ->where('acomodacion_id', $data['acomodacion'])
            ->where('tipo_habitacion_id', $data['tipo'])
            ->get();

        if (count($existType) == 1) {
            $data['acomodacion_tipo_habitacion_id'] = $existType[0]->id;
        } else {
            return response('Error', 400);
        }

        $exist = Habitacion::query()
                ->where('hotel_id', $data['hotel_id'])
                ->where('acomodacion_tipo_habitacion_id', $data['acomodacion_tipo_habitacion_id'])
                ->get();

        if (count($exist) == 1) {
            return response()->json(['error'=> 'asdsdadasdasddasd'], 400);
        } else {
            $validator = Validator::make($data, [
                'cantidad' => 'required|integer',
                'hotel_id' => 'exists:App\Models\Hotel,id',
                'acomodacion_tipo_habitacion_id' => 'required'
            ]);

            return Habitacion::create($validator->validated());
        }


    }

    private function updateHabitacion(Habitacion $habitacion, $data)
    {
        $exist = DB::table('acomodacion_tipo_habitaciones')
            ->where('acomodacion_id', $data['acomodacion'])
            ->where('tipo_habitacion_id', $data['tipo'])
            ->get();

        if (count($exist) == 1) {
            $data['acomodacion_tipo_habitacion_id'] = $exist[0]->id;
        } else {
            return response('Error', 400);
        }

        $validator = Validator::make($data, [
            'cantidad' => 'required|integer',
            'hotel_id' => 'exists:App\Models\Hotel,id',
            'acomodacion_tipo_habitacion_id' => 'required'
        ]);

        return $habitacion->update($validator->validated());
    }

    public function getBySlug(Hotel $hotel)
    {
        return new HotelResource($hotel);
    }

    function getTipoHabitaciones()
    {
        return TipoHabitacionResource::collection(
            TipoHabitacion::query()->orderBy('id', 'ASC')->get()
        );
    }

    public function getAcomodaciones($id)
    {
        $acomodaciones = TipoHabitacion::find($id)->acomodaciones()->orderBy('id', 'ASC')->get();

        return AcomodacionResource::collection($acomodaciones);
    }
}
