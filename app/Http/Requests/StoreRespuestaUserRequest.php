<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRespuestaUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'encuesta_id' => ['required', 'exists:encuestas,id'],
            'pregunta_id' => ['required', 'exists:preguntas,id'],
            'respuesta_id' => ['required', 'exists:respuestas,id'],
            'user_id' => ['required', 'exists:users,id'],
            'text' => ['nullable', 'string']
        ];
    }
}
