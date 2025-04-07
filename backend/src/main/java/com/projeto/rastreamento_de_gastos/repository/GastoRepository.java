package com.projeto.rastreamento_de_gastos.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.rastreamento_de_gastos.entity.Gasto;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long> {

List<Gasto> findByUsuarioIdAndDataBetween(Long usuarioId, LocalDate dataInicial, LocalDate dataFinal);
List<Gasto> findByUsuarioId(Long usuarioId);
Optional<Gasto> findFirstByUsuarioIdOrderByDataDesc(Long usuarioId);

@Query("SELECT SUM(r.valor) FROM Gasto r WHERE r.usuario.id = :usuarioId")
public Double somarValorTotalPorUsuario(@Param("usuarioId") Long usuarioId);

}
