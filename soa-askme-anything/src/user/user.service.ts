import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.manager.create(User, createUserDto);
    return this.manager.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.manager.findOne(User, id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found!`);
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.manager.findOne(User, { username: username });
    if (!user)
      throw new NotFoundException(`User with username: ${username} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) throw new NotFoundException(`User with id: ${id} not found`);
      const passwordChanged = updateUserDto.password;
      if (!passwordChanged) {
        manager.merge(User, user, updateUserDto);
        return manager.save(user);
      }
      //change of password case..needs to be hashed again
      const passwordChangedHashed = bcrypt.hash(passwordChanged, 10);
      updateUserDto.password = await passwordChangedHashed;
      manager.merge(User, user, updateUserDto);
      return manager.save(user);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user)
        throw new NotFoundException(
          `User with id: ${id} not found to be deleted`,
        );
      await manager.delete(User, id);
    });
  }
}
