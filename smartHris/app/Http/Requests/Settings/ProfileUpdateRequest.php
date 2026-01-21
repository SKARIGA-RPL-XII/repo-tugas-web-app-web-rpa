<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            'nip'           => ['nullable', 'string', 'max:50'],
            'jabatan'       => ['nullable', 'string', 'max:100'],
            'departemen'    => ['nullable', 'string', 'max:100'],
            'jenis_kelamin' => ['nullable', 'in:L,P'],
            'tanggal_lahir' => ['nullable', 'date'],
            'alamat'        => ['nullable', 'string', 'max:500'],
        ];
    }
}