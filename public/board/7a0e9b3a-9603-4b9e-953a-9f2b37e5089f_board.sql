ALTER SEQUENCE board_id_seq RESTART WITH 1;
ALTER SEQUENCE filebox_id_seq RESTART WITH 1;

select * from board;
select * from filebox;
select * from users;
select * from item;

select count(id) from board;

update board set board_type = 'NOTICE';

select b.*, f.*, u.name
from board b 
left join filebox f on b.id = f.board_id
left join users u on b.users_id = u.id
where b.id = 1;

select * from filebox;

delete from board where id = 7;

delete from board;


delete * from filebox where id = 2;

ALTER TABLE filebox
ADD CONSTRAINT fk_board_id
FOREIGN KEY (board_id) REFERENCES board(board_id)
ON DELETE CASCADE;

ALTER TABLE filebox DROP CONSTRAINT fk_board_id;

ALTER TABLE filebox
ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE;



